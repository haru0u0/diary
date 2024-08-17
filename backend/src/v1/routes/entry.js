import express from 'express';
import db from '../../../db.js';
import OpenAI from "openai";

const router = express.Router();
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

router.post("/new", async (req, res) => {
    const newEntry = await db.query(
        "INSERT INTO entry (user_id) VALUES ($1) RETURNING id",
        [req.user.id]);

    const newVersion = await db.query(
        "INSERT INTO version (entry_id, version_num, content) VALUES ($1, 0, $2) RETURNING id",
        [newEntry.rows[0].id, req.body.diary]);

    const getFeedback = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { "role": "system", "content": "You are an English teacher." },
            { "role": "user", "content": "Students wrote a diary in English. Write a response on content, but you do not need to fix or mention grammatical errors. You can implicitely show you understood what they tried to tell and be like a good listner. You do not need to say greetings (e.g. \"thank you\" or something). Let's directly dive into feedback on content. The student diary is following: \"" + req.body.diary + "\"" },
        ]
    });

    const newFeedback = await db.query(
        "INSERT INTO feedback (version_id, response) VALUES ($1, $2) RETURNING id",
        [newVersion.rows[0].id, getFeedback.choices[0].message.content]);

    const getExpressions = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: [
            {
                "role": "system",
                "content": "You are an English teacher.\n"
            },
            {
                "role": "user",
                "content": "Your student wrote a diary entry in English to expand their expression and vocabulary. Please respond in JSON format with three alternative words, expressions, or idioms they could have used instead of what they originally wrote. Response always should include three expressions in total. If the input is only few words, suggest three synonyms or related expressions. Focus solely on suggesting replacements for individual words or phrases; do not revise or correct entire sentences and do not give feedback on grammatical or spelling mistakes. Also this is not formal writting so please focus on the expressions for everyday informal conversation. Please focus on expanding vocab and expression for casual everyday conversation. Include the original word or phrase they used for comparison. The JSON format should include:original (the word or phrase used by the student), expression (the suggested alternative) and description (an explanation of why the alternative is a better choice). The Json format should be as followed:\n{\n  \"suggestions\": [\n    {\n      \"original\": \"XXX\",\n      \"expression\": \"XXX\",\n      \"description\": \"XXXXXX\"\n    },\n   {\n      \"original\": \"XXX\",\n      \"expression\": \"XXX\",\n      \"description\": \"XXXXXX\"\n    },\n   {\n      \"original\": \"XXX\",\n      \"expression\": \"XXX\",\n      \"description\": \"XXXXXX\"\n    }\n  ]\n}\n\nDiary Entry:\n\"" + req.body.diary + "\""
            }
        ],
        response_format: { type: "json_object" },
    });


    //save expression
    const parsed = JSON.parse(getExpressions.choices[0].message.content);

    //console.log(parsed);
    //console.log(parsed.suggestions[0]);
    for (let i = 0; i < 3; i++) {
        const existingExpression = await db.query(
            'SELECT * FROM expression WHERE expression = $1',
            [parsed.suggestions[i]]
        );

        if (existingExpression.rows.length === 0) {
            const newExpression = await db.query(
                'INSERT INTO expression (expression) VALUES ($1) RETURNING id',
                [parsed.suggestions[i].expression]
            );

            const newRelation = await db.query(
                'INSERT INTO version_expression (expression_id, version_id, explanation, original) VALUES ($1, $2, $3, $4) RETURNING id',
                [newExpression.rows[0].id, newVersion.rows[0].id, parsed.suggestions[i].description, parsed.suggestions[i].original]
            );
            console.log('Inserted new expression with ID:', newRelation.rows[0].id);
        } else {
            const newRelation = await db.query(
                'INSERT INTO version_expression (expression_id, version_id, explanation, original) VALUES ($1, $2, $3, $4) RETURNING id',
                [existingExpression.rows[0].id, newVersion.rows[0].id, parsed.suggestions[i].description, parsed.suggestions[i].original]
            );
            console.log('expression already exists. Added relation.');
        }
    }

    res.status(200).json({
        "version_id": newVersion.rows[0].id,
        "entry_id": newEntry.rows[0].id,
        "feedback_id": newFeedback.rows[0].id,
    });
});

//expressionひろって返す！
router.get("/version", async (req, res) => {
    const body = await db.query(
        "SELECT * from version WHERE id=$1",
        [req.query.id]);

    const feedback = await db.query(
        "SELECT * from feedback WHERE version_id=$1",
        [req.query.id]);

    const expression = await db.query(
        "SELECT ve.id, ve.expression_id, ve.version_id, e.expression, ve.explanation, ve.original FROM version_expression ve JOIN expression e ON ve.expression_id = e.id WHERE version_id=$1",
        [req.query.id]);

    console.log(expression.rows);

    res.status(200).json({
        version: body.rows[0],
        feedback: feedback.rows[0].response,
        expressions: expression.rows
    });
});

//get entries on the selected date, with the content of the latest version of each entry 
router.get("/date", async (req, res) => {
    const dateEntry = await db.query(
        "SELECT DISTINCT ON (e.id) e.id, e.user_id, e.is_deleted, v.id AS version_id, v.version_num, v.content, v.created_at FROM entry e JOIN version v ON e.id = v.entry_id WHERE e.user_id = $3 and e.is_deleted = false and e.created_at >= $1 and e.created_at < $2 ORDER BY e.id, v.created_at DESC;",
        [req.query.start, req.query.end, req.user.id]);

    res.status(200).json({
        dateEntry
    });
});


export default router;