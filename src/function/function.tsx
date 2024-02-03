import { updateDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
export const addedLink = async (_link: any): Promise<void> => {
    const _date = new Date().toLocaleDateString();
    const _time = new Date().toLocaleTimeString();
    const mainCollection = "Iframes";
    const countCollection = "IframesCounts"
    try {
        const response = await fetch(_link);
        if (response.ok) {
            const countRef = doc(db, countCollection, "hEedHPYfprSp0rO4PtZW")
            const currCount = (await getDoc(countRef)).get("count")
            const newCount = currCount + 1
            await updateDoc(countRef, { count: newCount })
            const _data = {
                link: _link,
                page: `p${newCount}`,
                date: _date,
                time: _time,
                owner: "kuldeep"
            }
            const documentPath = `${mainCollection}/page${newCount}`;
            const mainCollectionRef = doc(db, documentPath);
            await setDoc(mainCollectionRef, _data, { merge: false });
            window.location.reload();
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
