const mongoose = require('mongoose')

main().then(res => console.log('db  connected',));
main().catch(err => console.log('db not connected',err));



async function main() {
  await mongoose.connect(process.env.DB);
}