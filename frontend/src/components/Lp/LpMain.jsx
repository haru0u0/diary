import LpFooter from "./LpFooter";
import LpHeader from "./LpHeader";
import LpStep from "./LpStep";

function LpComponent() {
  return (
    <>
      <LpHeader />

      <div className="mx-5 lg:mx-96 text-center">
        <h2 className="text-3xl mt-10">How To Use Diary Quest</h2>
        <LpStep
          title="1. Write a Diary Entry and Receive an Immediate Feedback"
          desc="First, write a diary entry in English ✍️You’ll receive instant
              feedback from the AI with suggestions for rephrasing 💫"
          img="/images/lp/entry.gif"
          style="flex-col-reverse lg:flex-row from-left"
        />
        <LpStep
          title="2. Review Vocabularies Anytime"
          desc="You can save the AI’s rephrasing suggestions to your vocabulary
              list and review them whenever you like.📕🔍"
          img="/images/lp/vocab.gif"
          style="flex-col-reverse lg:flex-row-reverse from-right"
        />
        <LpStep
          title="3. Collect Badges"
          desc="You’ll earn badges based on the topics of your diary entries 🤩"
          img="/images/lp/badge.gif"
          style="flex-col-reverse lg:flex-row from-left"
        />
      </div>
      <LpFooter />
    </>
  );
}

export default LpComponent;
