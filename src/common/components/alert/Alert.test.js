import { ALERT_TYPES } from 'common/constants'
import { shallow } from 'enzyme'
import Alert from './Alert'

const mockAlert = {
	msg: 'alert',
	type: ALERT_TYPES.SUCCESS,
	onClose: jest.fn(),
}

const wrapper = shallow(
	<Alert
		msg={mockAlert.msg}
		type={mockAlert.type}
		onClose={mockAlert.onClose}
	/>
)

it('renders an alert component', () => {
	expect(wrapper.length).toEqual(1)
})

it('executes onClose method upon click on the x icon', () => {
	wrapper.find('[test-id="alert-x-icon"]').simulate('click')
	expect(mockAlert.onClose).toHaveBeenCalled()
})

it('sets the right class on the msg for the given type', () => {
	expect(wrapper.find('[test-id="alert-msg"]').hasClass('success')).toBeTruthy()
	expect(wrapper.find('[test-id="alert-msg"]').hasClass('error')).toBeFalsy()
})
