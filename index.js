import TelegramBot from "node-telegram-bot-api";
import { collection, query, where, getDocs, updateDoc, addDoc, doc } from "firebase/firestore";
import { db } from './firebaseConfig.js';

// replace the value below with the Telegram token you receive from @BotFather
const token = '6870863256:AAHlUt96JWigfIrOAXoLYPSAyBWmaqzIgzg';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

function generateRandomCode(length) {
    let code = '';
    for (let i = 0; i < length; i++) {
        code += Math.floor(Math.random() * 10); // Генерация случайной цифры от 0 до 9
    }
    return code;
}

var codeEmail;;

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const getUser = async (id_user, usernmae) => {
    codeEmail = generateRandomCode(4);
    const q = query(collection(db, "users"), where("id", "==", id_user));
    const querySnapshot = await getDocs(q);
    const itemsList = [];
    var ider = '';
    querySnapshot.forEach(async (docer) => {
        var d = docer.data();
        itemsList.push(d);
        ider = docer.id;
    })
    console.log(itemsList);
    setTimeout(() => {
        if(itemsList.length == 0) {
            fetchAuth(id_user, usernmae);
        } else {
            updateData(ider);
        }
    }, 1000);
}

const fetchAuth = async (id, email) => {
    var ref = makeid(7);
    try {
    const docRef = await addDoc(collection(db, "users"), {
        id: id,
        email: email,
        name: "",
        verified: 'false',
        wallet: '',
        type: 'Новичок',
        spred: '0.4',
        photo: '',
        passport: '',
        codeTel: generateRandomCode(4),
        codeEmail: codeEmail,
        tel: '',
        timing: '8',
        twoRef: '',
        balance: '0',
        balance2: '0',
        proxy: '',
        balance_status: 'false',
        referalCode: ref
    });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
  }
  const updateData = async (c) => {
    await updateDoc(doc(db, "users", c), {
        codeEmail: codeEmail
    });
  }


// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const username = msg.from.username;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;
  getUser(chatId, username);
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, `Добро поажловать в FINSALER AUTH BOT.\n\nВаш код авторизации: ${codeEmail}.\n\nВернитесь обратно в приложение и введите этот код.`);
});