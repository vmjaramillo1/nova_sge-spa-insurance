import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Faq from './faq'

describe('<Faq />', () => {
  it('should render', () => {
    render(<Faq title="Title test" items={[]} />)

    const titleEl = screen.getByText('Title test')

    expect(titleEl).toBeInTheDocument()
  })

  it('should render items', () => {
    const items = [
      {
        key: '1',
        order: 1,
        isActive: true,
        title: 'Question test',
        answer: 'Answer test',
        track: 'BM_Track_Name_1',
      },
    ]

    render(<Faq title="Title test" items={items} initialSelected="1" />)

    const questionEl = screen.getByText('Question test')
    const answerEl = screen.getByText('Answer test')

    expect(questionEl).toBeInTheDocument()
    expect(answerEl).toBeInTheDocument()
  })

  it('should rende only titles', () => {
    const items = [
      {
        key: '1',
        order: 1,
        isActive: true,
        title: 'Question test 1',
        answer: 'Answer test 1',
        track: 'BM_Track_Name_1',
      },
      {
        key: '2',
        order: 1,
        isActive: true,
        title: 'Question test 2',
        answer: 'Answer test 2',
        track: 'BM_Track_Name_2',
      },
    ]

    render(<Faq title="Title test" items={items} />)

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
        title: 'Question test 1',
        answer: 'Answer test 1',
        track: 'BM_Track_Name_1',
      },
      {
        key: '2',
        order: 2,
        isActive: true,
        title: 'Question test 2',
        answer: 'Answer test 2',
        track: 'BM_Track_Name_2',
      },
    ]

    render(<Faq title="Title test" items={items} initialSelected="1" />)

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
        title: 'Question test 1',
        answer: 'Answer test 1',
        track: 'BM_Track_Name_1',
      },
      {
        key: '2',
        order: 1,
        isActive: true,
        title: 'Question test 2',
        answer: 'Answer test 2',
        track: 'BM_Track_Name_2',
      },
    ]

    render(<Faq title="Title test" items={items} initialSelected="1" />)

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
