import { render, screen } from '@testing-library/react'
import ButtonSave from './button-save'

describe('<ButtonSave />', () => {
  it('should render ButtonSave', () => {
    render(<ButtonSave />)
    const buttonSaveEl = screen.getByRole('button')
    expect(buttonSaveEl).toBeInTheDocument()
  })
})
