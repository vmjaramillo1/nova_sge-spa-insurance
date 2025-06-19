import FavoriteIcon from '@app/components/icons/FavoriteIcon'
import ClinicalNotesIcon from '@app/components/icons/ClinicalNotesIcon'
import EcgHeartIcon from '@app/components/icons/EcgHeartIcon'
import ExperimentIcon from '@app/components/icons/ExperimentIcon'
import AdminMedsIcon from '@app/components/icons/AdminMedsIcon';

const WrapperIcons = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'favorite':
      return <FavoriteIcon />
    case 'admin_meds':
      return <AdminMedsIcon />
    case 'clinical_notes':
      return <ClinicalNotesIcon />
    case 'ecg_heart':
      return <EcgHeartIcon />
    case 'experiment':
      return <ExperimentIcon />
    default:
      return (
        <pichincha-icon
          size="24px"
          type="--outlined"
          color="blue"
          weight-color="500"
        >
          {icon}
        </pichincha-icon>
      )
  }
}

export default WrapperIcons
