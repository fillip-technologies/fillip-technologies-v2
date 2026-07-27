import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI);
const col = mongoose.connection.collection("leads");

const docs = await col.find({}, { projection: { _id: 1, name: 1, source: 1 } }).toArray();
console.log(`total leads: ${docs.length}`);
const re = /^[a-f0-9]{24}$/i;
for (const d of docs) {
  const s = String(d._id);
  console.log(`_id=${s} type=${d._id?.constructor?.name} len=${s.length} passesGuard=${re.test(s)} name=${d.name ?? ""}`);
}

// Reproduce the app path: Mongoose model updateOne with a STRING id.
const Lead = mongoose.models.Lead || mongoose.model("Lead", new mongoose.Schema({}, { strict: false, collection: "leads" }));
const sample = docs[0];
const idStr = String(sample._id);
console.log(`\nTesting Mongoose updateOne with string id "${idStr}"`);
const res = await Lead.updateOne({ _id: idStr }, { $set: { _probe: 1 } });
console.log(`matchedCount=${res.matchedCount} modifiedCount=${res.modifiedCount}`);
await Lead.updateOne({ _id: idStr }, { $unset: { _probe: "" } }); // cleanup

await mongoose.disconnect();
