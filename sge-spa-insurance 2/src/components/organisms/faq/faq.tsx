import { FC, memo, useMemo, useState } from 'react'
import clsx from 'clsx'

import Accordion from '@app/components/atoms/accordion'
import Typography from '@app/components/atoms/typography'
import { WithIsActive, WithKey, WithOrder } from '@app/utils/interfaces'
import { filterAndSort } from '@app/utils/common'

import './faq.scss'
import { pushTrackEvent } from '@app/utils/messages'

interface AccordionItem extends WithKey, WithOrder, WithIsActive {
  title: string
  answer: string
  track: string
}

interface FaqProps {
  title: string
  titleAria?: string
  initialSelected?: string
  items: Array<AccordionItem>
  classes?: Partial<Classes>
}

interface Classes {
  root: string
}

const Faq: FC<FaqProps> = (props) => {
  const { initialSelected, items, title, titleAria, classes } = props

  const [accordionSelected, setAccordionSelected] = useState<string>(
    initialSelected ?? ''
  )

  const handleSelectAccordion = (eventName: string) => (value: string) => {
    pushTrackEvent(eventName)
    setAccordionSelected((prev) => (value === prev ? '' : value))
  }

  const mappedItems = useMemo(() => filterAndSort(items), [items])

  return (
    <section className={clsx(classes?.root)}>
      <Typography
        variant="subtitle"
        className="font-semibold mb-16"
        aria-label={titleAria}
      >
        {title}
      </Typography>
      <ul className="faq__list">
        {mappedItems.map((faq) => (
          <Accordion
            key={faq.key}
            title={
              <Typography variant="body" className="font-semibold">
                {faq.title}
              </Typography>
            }
            value={faq.key}
            active={accordionSelected === faq.key}
            onChange={handleSelectAccordion(faq.track)}
          >
            {faq.answer}
          </Accordion>
        ))}
      </ul>
    </section>
  )
}

export default memo(Faq)
