import clsx from 'clsx'
import { domToReact } from 'html-react-parser'
import Typography, { TypographyProps } from '@app/components/atoms/typography'
import { pushTrackEvent, openBrowser } from '@app/utils/messages'
import { createReplace } from '../utils'
import { smartFormatParseOptions } from '../converter'

export default createReplace({
  name: 'sf-link',
  attributes: ['to', 'arialabel', 'classname', 'trackevent', 'variant'],
  replace: (node) => {
    const {
      to = '#',
      arialabel = '',
      trackevent = '',
      classname = '',
      variant = 'legal',
    } = node.attribs

    const handleDownload = () => {
      pushTrackEvent(trackevent)
      openBrowser(to)
    }

    return (
      <Typography
        onClick={handleDownload}
        variant={variant as TypographyProps['variant']}
        className={clsx('link-format font-semibold', classname)}
        as="a"
        aria-label={arialabel}
      >
        {domToReact(node.children, smartFormatParseOptions)}
      </Typography>
    )
  },
})
