import { AppDataSource } from "../data-source"
import { Post } from "../entity/Post"
import { Client, TextChannel, Intents } from 'discord.js'

export const sendReservePostTask = async (client: Client) => {
  var posts = checkReservePost();

  (await posts).forEach(post => sendPost(client, post));
}

const sendPost = async (client: Client, post: Post) => {
  var channel = client.channels.cache.get(post.channel_id) as TextChannel
  await channel.send(post.content)
}

const checkReservePost = async () => {
  console.log(formatDate(new Date(Date.now())))
  const posts = await AppDataSource
    .getRepository(Post)
    .createQueryBuilder("post")
    .where("post.reserve_time = :time", { time: formatDate(new Date(Date.now())) })
    .getMany()
  console.log(posts)

  return posts
}

const formatDate = (currentDateTime: Date) => {
  let formattedDate = currentDateTime.getFullYear() + "/" + (currentDateTime.getMonth() + 1) + "/" + currentDateTime.getDate() + " " + currentDateTime.getHours() + ":" + currentDateTime.getMinutes() + ":00";
  return formattedDate;
}