const JSONStream = require("JSONStream");
const fs = require('fs')

const stream = fs.createReadStream('enheter_alle.json', {encoding: 'utf8'});
const result = fs.createWriteStream("frivillig.json", {encoding: "utf8"});
const parser = JSONStream.parse("*");

let i = 0;
let y = 0;
result.write("[")
parser.on("data",(chunk)=>{
    y++
    if(chunk.registrertIFrivillighetsregisteret && !chunk.konkurs && !chunk.underAvvikling && !chunk.underTvangsavviklingEllerTvangsopplosning){
        i++
        result.write(`${JSON.stringify({
            organisasjonsnummer:chunk.organisasjonsnummer,
            navn: chunk.navn,
            organisasjonsform: chunk.organisasjonsform.beskrivelse,
            institusjonellSektorkode: chunk.institusjonellSektorkode.kode,
            forretningsadresse: chunk.forretningsadresse,
        })},\n`)
    }
})
parser.on("end",()=>{
    result.write("]")
    console.log(`Det er ${i} i frivillighetsregisteret av ${y} i enhetsregisteret`);
})
stream.pipe(parser);