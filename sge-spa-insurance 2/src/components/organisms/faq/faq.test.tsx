import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Faq from './faq'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

const title = {
  value: 'Title test',
  aria: 'Title test, sección con tres opciones desplegables.',
}

const store = makeStore({
  app: appValues,
  flow: flowValues,
  global: globalValues,
})

const wrapper = createWrapperStore(store)

describe('<Faq />', () => {
  it('should render', () => {
    render(<Faq title={title} items={[]} />)

    const titleEl = screen.getByText('Title test')

    expect(titleEl).toBeInTheDocument()
  })

  it('should render items', () => {
    const items = [
      {
        key: '1',
        order: 1,
        isActive: true,
        question: {
          value: 'question test',
          aria: 'question test',
        },
        answer: {
          value: 'answer test',
          aria: 'answer test',
        },
        track: 'BM_Track_Name_1',
      },
    ]

    render(<Faq title={title} items={items} initialSelected="1" />, {
      wrapper: wrapper,
    })

    const questionEl = screen.getByText('question test')
    const answerEl = screen.getByText('answer test')

    expect(questionEl).toBeInTheDocument()
    expect(answerEl).toBeInTheDocument()
  })

  it('should rende only titles', () => {
    const items = [
      {
        key: '1',
        order: 1,
        isActive: true,
        question: {
          value: 'Question test 1',
          aria: 'Question test 1',
        },
        answer: {
          value: 'Answer test 1',
          aria: 'Answer test 1',
        },
        track: 'BM_Track_Name_1',
      },
      {
        key: '2',
        order: 2,
        isActive: true,
        question: {
          value: 'Question test 2',
          aria: 'Question test 2',
        },
        answer: {
          value: 'Answer test 2',
          aria: 'Answer test 2',
        },
        track: 'BM_Track_Name_2',
      },
    ]

    render(<Faq title={title} items={items} />, {
      wrapper: wrapper,
    })

    const firstQuestion = screen.getByText('Question test 1')
    const secondQuestion = screen.getByText('Question test 2')

    const firstAnswer = screen.queryByText('Answer test 1')
    const secondAnswer = screen.queryByText('Answer test 2')

    expect(firstQuestion).toBeInTheDocument()
    expect(secondQuestion).toBeInTheDocument()

    expect(firstAnswer).toBeNull()
    expect(secondAnswer).toBeNull()
  })

  it('should change accordion selected and close the other', async () => {
    const items = [
      {
        key: '1',
        order: 1,
        isActive: true,
        question: {
          value: 'Question test 1',
          aria: 'Question test 1',
        },
        answer: {
          value: 'Answer test 1',
          aria: 'Answer test 1',
        },
        track: 'BM_Track_Name_1',
      },
      {
        key: '2',
        order: 2,
        isActive: true,
        question: {
          value: 'Question test 2',
          aria: 'Question test 2',
        },
        answer: {
          value: 'Answer test 2',
          aria: 'Answer test 2',
        },
        track: 'BM_Track_Name_2',
      },
    ]

    render(<Faq title={title} items={items} initialSelected="1" />, {
      wrapper: wrapper,
    })

    const secondQuestion = screen.getByText('Question test 2')
    const secondAnswer = screen.queryByText('Answer test 2')

    expect(secondQuestion).toBeInTheDocument()
    expect(secondAnswer).toBeNull()

    fireEvent.click(secondQuestion)

    await waitFor(() => {
      const newFirstAnswer = screen.queryByText('Answer test 1')
      const newSecondAnswer = screen.getByText('Answer test 2')

      expect(newFirstAnswer).toBeNull()
      expect(newSecondAnswer).toBeInTheDocument()
    })
  })

  it('should close accordion onClick same', async () => {
    const items = [
      {
        key: '1',
        order: 1,
        isActive: true,
        question: {
          value: 'Question test 1',
          aria: 'Question test 1',
        },
        answer: {
          value: 'Answer test 1',
          aria: 'Answer test 1',
        },
        track: 'BM_Track_Name_1',
      },
      {
        key: '2',
        order: 2,
        isActive: true,
        question: {
          value: 'Question test 2',
          aria: 'Question test 2',
        },
        answer: {
          value: 'Answer test 2',
          aria: 'Answer test 2',
        },
        track: 'BM_Track_Name_2',
      },
    ]

    render(<Faq title={title} items={items} initialSelected="1" />, {
      wrapper: wrapper,
    })

    const firstQuestion = screen.getByText('Question test 1')

    fireEvent.click(firstQuestion)

    await waitFor(() => {
      const newFirstAnswer = screen.queryByText('Answer test 1')
      const newSecondAnswer = screen.queryByText('Answer test 2')

      expect(newFirstAnswer).toBeNull()
      expect(newSecondAnswer).toBeNull()
    })
  })
})
