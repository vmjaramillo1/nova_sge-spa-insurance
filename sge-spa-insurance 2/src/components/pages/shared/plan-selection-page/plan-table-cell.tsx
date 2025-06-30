import React from 'react'
import SmartContent, { useSmartText } from '@app/components/atoms/smart-text'
import clsx from 'clsx'
import usePlanSelectionPage from './use-plan-selection-page'

const PlanTableCell = ({
  planCode,
  selectedPlan,
  benefitCode,
}: {
  planCode: string
  selectedPlan: string
  benefitCode: string
}) => {
  const { content, getIcon } = usePlanSelectionPage()

  const ariaText = useSmartText(content.table[planCode].row[benefitCode].aria ?? '')

  return (
    <td
      className={clsx(
        planCode == selectedPlan && 'plan-selection-page__table--selected',
        'text-center px-4'
      )}
      aria-label={ariaText}
    >
      {benefitCode === 'BENE01' || benefitCode === 'BENE06' ? (
        <SmartContent>{content.table[planCode].row[benefitCode].value}</SmartContent>
      ) : (
        getIcon(content.table[planCode].row[benefitCode].value)
      )}
    </td>
  )
}

export default PlanTableCell
