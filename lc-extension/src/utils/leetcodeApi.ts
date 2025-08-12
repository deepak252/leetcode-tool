// src/utils/leetcodeApi.ts
import axios from 'axios'

export interface QuestionDetail {
  questionId: string
  title: string
  content: string
  difficulty: string
  likes: number
  dislikes: number
  stats: string
}

const LEETCODE_GRAPHQL = 'https://leetcode.com/graphql'

export async function fetchQuestionDetails(
  slug: string
): Promise<QuestionDetail> {
  const query = `
    query questionData($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        questionId
        title
        titleSlug
        difficulty
        likes
        dislikes
        exampleTestcases
      }
    }
  `

  try {
    const response = await axios.post(
      LEETCODE_GRAPHQL,
      {
        query,
        variables: { titleSlug: slug },
      },
      {
        withCredentials: true, // important to use logged-in cookies
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (response.data.errors) {
      throw new Error(`GraphQL Error: ${JSON.stringify(response.data.errors)}`)
    }

    return response.data.data.question
  } catch (error) {
    console.error(`Failed to fetch question details for ${slug}`, error)
    throw error
  }
}
