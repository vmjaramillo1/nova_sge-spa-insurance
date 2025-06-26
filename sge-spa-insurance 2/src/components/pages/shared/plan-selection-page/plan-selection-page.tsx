import SmartContent from '@app/components/atoms/smart-text'
import Typography from '@app/components/atoms/typography'
import './plan-selection-page.scss'
import { useSmartText } from '@app/components/atoms/smart-text'

import usePlanSelectionPage from './use-plan-selection-page'
import Radio from '@app/components/atoms/radio'
import clsx from 'clsx'
import Button from '@app/components/atoms/button'
import PlanTableCell from './plan-table-cell'

const PlanSelection = () => {
  const {
    content,
    benefitsCodes,
    planCodes,
    selectedPlan,
    ariaFooter,
    handleChangePlan,
    handleNextPage,
  } = usePlanSelectionPage()

  return (
    <>
      <div className="plan-selection-page -mx-20 -my-24">
        <Typography variant="body" className="my-20 ml-16">
          <SmartContent>{content.title.value}</SmartContent>
        </Typography>

        <div className="plan-selection-page__table-wrapper">
          <table className="plan-selection-page__table ">
            <thead className="text-primary-alternative1-500 text-left">
              <tr>
                <th className="text-button text-blue-500 py-16 pl-8 sticky-col">
                  Planes
                </th>
                {planCodes.map((planCode) => (
                  <th
                    key={planCode}
                    className={clsx(
                      planCode == selectedPlan &&
                        'plan-selection-page__table--selected',
                      'plan-selection-page__table py-16 pl-8'
                    )}
                  >
                    <SmartContent>
                      {content.table[planCode].header.value}
                    </SmartContent>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {benefitsCodes.map((benefitCode) => (
                <tr key={benefitCode}>
                  <td className="py-4 pl-8 pr-0 sticky-col">
                    <SmartContent>
                      {content.benefits[benefitCode].value}
                    </SmartContent>
                  </td>
                  {planCodes.map((planCode) => (
                    <PlanTableCell
                      key={planCode}
                      planCode={planCode}
                      selectedPlan={selectedPlan}
                      benefitCode={benefitCode}
                    />
                  ))}
                </tr>
              ))}
              <tr>
                <td className="py-8 sticky-col"></td>
                {planCodes.map((planCode) => (
                  <td
                    key={planCode}
                    className={clsx(
                      planCode == selectedPlan &&
                        'plan-selection-page__table--selected',
                      'text-center'
                    )}
                    onClick={() => handleChangePlan(planCode)}
                    aria-label={`Selector de plan ${content.table[planCode].header.aria}`}
                  >
                    <Radio checked={selectedPlan == planCode} data-testid="radio" />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="floating-container">
          <div className="floating-container__left" aria-label={ariaFooter}>
            <Typography variant="body" aria-hidden="true">
              <SmartContent context={{ selectedPlan }}>
                {content.actions.footer.planSelected.value}
              </SmartContent>
            </Typography>

            <Typography variant="body" aria-hidden="true">
              <SmartContent context={{ selectedPlan }}>
                {content.actions.footer.planPrice.value}
              </SmartContent>
            </Typography>

            <Typography variant="body" aria-hidden="true">
              <SmartContent context={{ selectedPlan }}>
                {content.actions.footer.paymentFrequency.value}
              </SmartContent>
            </Typography>
          </div>

          <Button className="m-auto" onClick={handleNextPage} aria-hidden="true">
            {content.actions.cta.value}
          </Button>
        </div>
      </div>
    </>
  )
}

export default PlanSelection
