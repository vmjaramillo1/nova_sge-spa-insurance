import { FC, memo, useMemo, useState } from 'react'
import clsx from 'clsx'

import Accordion from '@app/components/atoms/accordion'
import Typography from '@app/components/atoms/typography'
import { WithIsActive, WithKey, WithOrder } from '@app/utils/interfaces'
import { filterAndSort } from '@app/utils/common'

import './faq.scss'
import { pushTrackEvent } from '@app/utils/messages'
import { TextWhitAria } from '@app/store/hooks/use-generic-portal-selector'
import SmartContent from '@app/components/atoms/smart-text'

interface AccordionItem extends WithKey, WithOrder, WithIsActive {
  question: TextWhitAria
  answer: TextWhitAria
  track: string
  icon?: string | React.ReactNode
}

interface FaqProps {
  title?: TextWhitAria
  description?: TextWhitAria
  initialSelected?: string
  items: Array<AccordionItem>
  classes?: Partial<Classes>
}

interface Classes {
  root: string
}

const Faq: FC<FaqProps> = (props) => {
  const { initialSelected, items, title, description, classes } = props

  const [accordionSelected, setAccordionSelected] = useState<string>(
    initialSelected ?? ''
  )

  const handleSelectAccordion = (eventName: string) => (value: string) => {
    pushTrackEvent(eventName)
    setAccordionSelected((prev) => (value === prev ? '' : value))
  }

  const mappedItems = useMemo(() => filterAndSort(items), [items])

  const renderQuestionTitle = (
    question: TextWhitAria,
    icon?: string | React.ReactNode
  ) => {
    return icon ? (
      <Typography
        variant="body"
        className="font-semibold faq__question-title-image"
        aria-label={question.aria}
      >
        {icon}
        <span className="ml-16">{question.value}</span>
      </Typography>
    ) : (
      <Typography
        variant="body"
        className="font-semibold"
        aria-label={question.aria}
      >
        <SmartContent>{question.value}</SmartContent>
      </Typography>
    )
  }

  return (
    <section className={clsx(classes?.root)}>
      {title && (
        <Typography
          variant="subtitle"
          className="font-semibold mb-16"
          aria-label={title.aria}
        >
          {title.value}
        </Typography>
      )}

      {description && (
        <Typography variant="body" className="mb-16" aria-label={description.aria}>
          <SmartContent>{description.value}</SmartContent>
        </Typography>
      )}

      <ul className="faq__list">
        {mappedItems.map((faq) => (
          <Accordion
            key={faq.key}
            title={renderQuestionTitle(faq.question, faq.icon)}
            value={faq.key}
            active={accordionSelected === faq.key}
            onChange={handleSelectAccordion(faq.track)}
          >
            <Typography variant="caption" className="mb-16">
              <SmartContent>{faq.answer.value}</SmartContent>
            </Typography>
          </Accordion>
        ))}
      </ul>
    </section>
  )
}

export default memo(Faq)
