import { memo, FC } from 'react'
import CoverageItem from '@app/components/atoms/coverage-item'

import './modal-coverage.scss'
import Typography from '../typography/typography'
import clsx from 'clsx'
import Divider from '@app/components/atoms/divider/divider'
import Button from '@app/components/atoms/button'
import SmartContent from '@app/components/atoms/smart-text'
import { TextWhitAria } from '@app/store/hooks/use-generic-portal-selector'

interface Item {
  key: string
  description: TextWhitAria
  icon: React.ReactNode
}

interface itemsList {
  title: TextWhitAria
  items: Array<Item>
}

interface ModalCoverageProps {
  title: TextWhitAria
  description: TextWhitAria
  actions: {
    btnDownload: TextWhitAria
  }
  exclusions: itemsList
  coverages: itemsList

  handleClose: () => void
}

const ModalCoverage: FC<ModalCoverageProps> = (props) => {
  const { handleClose, title, description, actions, exclusions, coverages } = props

  const renderItems = (item: Item) => {
    return (
      <CoverageItem
        key={item.key}
        icon={item.icon}
        aria={item.description?.aria}
        classes={{ root: 'modal-coverage__items' }}
      >
        <Typography variant="button" aria-hidden="true">
          <SmartContent>{item.description?.value}</SmartContent>
        </Typography>
      </CoverageItem>
    )
  }

  return (
    <div className="modal-coverage">
      <div className="modal-coverage__header">
        <Typography
          variant="body"
          className="font-semibold text-blue-500"
          aria-label={title.aria}
        >
          {title.value}
        </Typography>
        <button
          onClick={handleClose}
          className={clsx('product-detail__action')}
          type="button"
          aria-label={'content.sectionCoverages.actionShowCoverages.aria'}
        >
          <pichincha-icon
            size="24px"
            type="--outlined"
            color="blue"
            weight_color="500"
            aria-hidden="true"
          >
            close
          </pichincha-icon>
        </button>
      </div>

      <div className="modal-coverage__content">
        <Typography
          variant="body"
          className="font-medium text-dark-gray-500"
          aria-label={description.aria}
        >
          {description.value}
        </Typography>

        <div className="modal-coverage__coverages">
          <Typography
            variant="body"
            className="font-semibold text-dark-gray-500 my-16"
            aria-label={coverages.title.aria}
          >
            {coverages.title.value}
          </Typography>

          <ul>{coverages.items.map((item) => renderItems(item))}</ul>
        </div>

        <Divider className="h-16 mb-16 mt-16 -mx-24" />

        <div className="modal-coverage__coverages mb-82">
          <Typography
            variant="body"
            className="font-semibold text-dark-gray-500 my-16"
            aria-label={exclusions.title.aria}
          >
            {exclusions.title.value}
          </Typography>

          <ul>{exclusions.items.map((item) => renderItems(item))}</ul>
        </div>
      </div>

      <div className="modal-coverage__footer">
        <Button
          className="mt-auto"
          onClick={handleClose}
          aria-label={actions.btnDownload.aria}
          color="secondary"
        >
          {actions.btnDownload.value}
        </Button>
      </div>
    </div>
  )
}

export default memo(ModalCoverage)
