import SmartContent from '@app/components/atoms/smart-text'
import Typography from '@app/components/atoms/typography'
import './plan-selection-page.scss'

import usePlanSelectionPage from './use-plan-selection-page'
import Radio from '@app/components/atoms/radio'
import clsx from 'clsx'
import Button from '@app/components/atoms/button'

const PlanSelection = () => {
  const {
    content,
    benefitsCodes,
    planCodes,
    selectedPlan,
    getIcon,
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
                    <SmartContent>{content.table[planCode].header}</SmartContent>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {benefitsCodes.map((benefitCode) => (
                <tr key={benefitCode}>
                  <td className="py-4 pl-8 pr-0 sticky-col">
                    <SmartContent>{content.benefits[benefitCode]}</SmartContent>
                  </td>
                  {planCodes.map((planCode) => (
                    <td
                      key={planCode}
                      className={clsx(
                        planCode == selectedPlan &&
                          'plan-selection-page__table--selected',
                        'text-center px-4'
                      )}
                    >
                      {benefitCode === 'BENE01' || benefitCode === 'BENE06' ? (
                        <SmartContent>
                          {content.table[planCode].row[benefitCode]}
                        </SmartContent>
                      ) : (
                        getIcon(content.table[planCode].row[benefitCode])
                      )}
                    </td>
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
                  >
                    <Radio checked={selectedPlan == planCode} data-testid="radio" />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="floating-container">
          <div className="floating-container__left">
            <SmartContent context={{ selectedPlan }}>
              {content.actions.footer}
            </SmartContent>
          </div>

          <Button
            className="m-auto"
            onClick={handleNextPage}
            aria-label={content.actions.cta.aria}
          >
            {content.actions.cta.value}
          </Button>
        </div>
      </div>
    </>
  )
}

export default PlanSelection
