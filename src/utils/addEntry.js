import  {db} from "../db/db";

export default async function addEntry(score,magnitude,title,body) {
    try {
      const id = await db.journal.add({
        date_time : new Date().toString(),
        score : score,
        magnitude : magnitude,
        title : title,
        body :  body,
      });
    } catch (error) {
      console.log(`Failed to add ${title}: ${error}`);
    }
};