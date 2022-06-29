import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { Message, Client, Intents, ApplicationCommandDataResolvable } from 'discord.js'
import { Reserve } from './command/reserve'
import { RunTask } from './task/task-manager'
import * as dotenv from 'dotenv'


AppDataSource.initialize()

dotenv.config()

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'REACTION']
})

const reserve = new Reserve()

const sample: ApplicationCommandDataResolvable = {
    name: 'reserve',
    description: '投稿を予約します',
    type: 'CHAT_INPUT'
};
const Commands = [sample];

client.once('ready', async () => {
    console.log('Ready!')
    console.log(client.user?.tag)

    console.log(client.channels)

    var channel = client.channels.cache.get('<#986463037139611729>')
    console.log(channel)

    await client.application?.commands.set(Commands, '983523686831235122');

    RunTask(client);
})

client.on('messageCreate', async (message: Message) => {
    if (message.author.bot) return
    if (reserve.IsRunTask()) {
        // 予約投稿のタスクが始まっていたらメッセージを受信
        reserve.RunReserveTask(message)
    }
})

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    if (interaction.commandName === 'reserve') {
        // /reserveを受信したら予約投稿開始
        await reserve.StartReserveTask(interaction)
    }
});

client.login(process.env.TOKEN)
