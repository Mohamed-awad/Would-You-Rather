import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
        .then((question) => dispatch(addQuestion(question)))
        .then(() => dispatch(hideLoading()))
  }
}

function answerQuestion ({ qid, authedUser, answer }) {
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer
  }
}


export function handleAnswerQuestion(info) {
  return (dispatch) => {
    dispatch(answerQuestion(info))

    return _saveQuestionAnswer(info)
        .catch((e)=> {
          console.warn('Error in _saveQuestionAnswer', e)
          dispatch(answerQuestion(info))
          alert('the was an error answering the question. try again')
        })
  }
}
