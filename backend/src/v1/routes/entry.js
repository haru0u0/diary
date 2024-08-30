import express from 'express';
import db from '../../../db.js';
import OpenAI from "openai";

const router = express.Router();
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

router.post("/new", async (req, res) => {
    try {
        const newEntry = await db.query(
            "INSERT INTO entry (user_id) VALUES ($1) RETURNING id",
            [req.user.id]);


        const newVersion = await db.query(
            "INSERT INTO version (entry_id, version_num, content) VALUES ($1, 0, $2) RETURNING id",
            [newEntry.rows[0].id, req.body.diary]);

        const getFeedback = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            messages: [
                { "role": "system", "content": "You are an English teacher." },
                { "role": "user", "content": "Students wrote a diary in English to practice English. Write a comment on content, but you do not need to fix or mention grammatical errors. You can implicitely show you understood what they tried to tell and be like a good listner. You do not need to include greetings (e.g. \"thank you\" or something). Let's directly dive into feedback on content. Your comment should be less than 100 words.\nYou also want to give them a badge based on the topic they wrote on. Please select the most relevant one from the list of the badges : beer, firework, office,sun, butterfly, gift, panda, sunflower, cake, green_tea, pasta, tomato, camera, halloween, peach, train, car, key, pot, tree, chocolate, letter, running, tulip, christmas_tree, lightning, sakura, ufo, computer, map, school, umbrella, cycling, medal, sloth, dog, mug, speaker.\nYour response should be in the following JSON format. {\"comment\":XXX, \"badge\": XXX}\nDiary that your student submitted is following:\n \"" + req.body.diary + "\"" },
            ],
            response_format: { type: "json_object" },
        });

        const parsedFeedback = JSON.parse(getFeedback.choices[0].message.content);

        const searchBadgeId = await db.query(
            "SELECT * FROM badge WHERE name = $1",
            [parsedFeedback.badge]
        );

        const newFeedback = await db.query(
            "INSERT INTO feedback (version_id, badge_id, response) VALUES ($1, $2, $3) RETURNING id",
            [newVersion.rows[0].id, searchBadgeId.rows[0].id, parsedFeedback.comment]
        );

        //----------------------expressions------------------------------
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
        const parsedExpression = JSON.parse(getExpressions.choices[0].message.content);

        for (let i = 0; i < 3; i++) {
            const existingExpression = await db.query(
                'SELECT * FROM expression WHERE expression = $1',
                [parsedExpression.suggestions[i]]
            );

            if (existingExpression.rows.length === 0) {
                const newExpression = await db.query(
                    'INSERT INTO expression (expression) VALUES ($1) RETURNING id',
                    [parsedExpression.suggestions[i].expression]
                );

                const newRelation = await db.query(
                    'INSERT INTO version_expression (expression_id, version_id, explanation, original) VALUES ($1, $2, $3, $4) RETURNING id',
                    [newExpression.rows[0].id, newVersion.rows[0].id, parsedExpression.suggestions[i].description, parsedExpression.suggestions[i].original]
                );
                //console.log('Inserted new expression with ID:', newRelation.rows[0].id);
            } else {
                const newRelation = await db.query(
                    'INSERT INTO version_expression (expression_id, version_id, explanation, original) VALUES ($1, $2, $3, $4) RETURNING id',
                    [existingExpression.rows[0].id, newVersion.rows[0].id, parsedExpression.suggestions[i].description, parsedExpression.suggestions[i].original]
                );
                //console.log('expression already exists. Added relation.');
            }
        }

        res.status(200).json({
            "version_id": newVersion.rows[0].id,
            "entry_id": newEntry.rows[0].id,
            "feedback_id": newFeedback.rows[0].id,
        });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: "An error occurred" });
    }
});

router.get("/version", async (req, res) => {
    const body = await db.query(
        "SELECT * from version WHERE id=$1",
        [req.query.id]);

    const feedback = await db.query(
        "SELECT * from feedback WHERE version_id=$1",
        [req.query.id]);

    const badge = await db.query(
        "SELECT * FROM badge WHERE id=$1",
        [feedback.rows[0].badge_id]);

    const expression = await db.query(
        "SELECT ve.id, ve.expression_id, ve.version_id, e.expression, ve.explanation, ve.original FROM version_expression ve JOIN expression e ON ve.expression_id = e.id WHERE version_id=$1",
        [req.query.id]);

    res.status(200).json({
        version: body.rows[0],
        feedback: feedback.rows[0].response,
        badge: badge.rows[0].name,
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