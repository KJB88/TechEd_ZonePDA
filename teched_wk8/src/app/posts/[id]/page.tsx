/* ROUTE: POST ID */
import {
  getPostByID,
  getAllCommentsByPostID,
  addNewComment
} from '@/app/ts/dbHandler'
import { revalidatePath } from 'next/cache'
import Heading from '@/app/heading'
import ContentModifier from '@/app/contentMod'
import { notFound } from 'next/navigation'
import Post from '@/app/post'

export async function generateMetadata ({ params }: { params: { id: number } }) {
  const result = await getPostByID(params.id)
  const post = result[0]

  return {
    title: `ZonePDA Post: ${post.title}`,
    description: `Viewing post of ${post.title}`
  }
}

export default async function SinglePostPage ({
  params
}: {
  params: { id: number }
}) {
  const result = await getPostByID(params.id)
  const post = result[0]

  if (!post) {
    notFound()
  }

  const cmtResult = await getAllCommentsByPostID(post.id)
  const comments = cmtResult

  async function submitComment (formData: FormData) {
    'use server'

    const content = formData.get('content') as string

    await addNewComment(content, 1, params.id)

    revalidatePath(`/posts/${params.id}`)
  }

  return (
    <>
      <Heading data={{ name: post.header }} />
      <div className='border-b-2 border-b-white'>
        <Post
          data={{
            id: post.id,
            name: post.name,
            header: post.header,
            timeDate: post.timeDate,
            content: post.content,
            pfp: post.pfp,
            faction: post.faction,
            location: post.location
          }}
        />
      </div>
      <div>
        <form
          className='flex flex-col border-b-white border-b-2 pb-2'
          action={submitComment}
        >
          <label htmlFor='content'>Comment:</label>
          <input className='text-black' type='text' name='content' />
          <button className='bg-gray-300 text-black mt-2'>
            Submit Comment
          </button>
        </form>
        <ul>
          {comments.map(comment => (
            <li key={comment.id} className='border-b-2 border-b-white'>
              <p>{comment.content}</p> by{' '}
              <span className='font-bold'>{comment.name}</span> at{' '}
              <span className='font-bold'>
                {comment.date_created.toString()}
              </span>
              <ContentModifier data={{ id: comment.id, isPost: false }} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
