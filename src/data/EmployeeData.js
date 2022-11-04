import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';

const employeeData = [
    {
        emp_name: 'Darshan Mistry',
        emp_email: 'dm@vpninfotech.com',
        status: 'Active',
        sr_no: '1'
    },
    {
        emp_name: 'Amit Rathod',
        emp_email: 'ar@vpninfotech.com',
        status: 'Active',
        actions: [<EditIcon color="primary" />, <VisibilityIcon color="Warning" />, <DeleteIcon color="secondary" />],
        sr_no: '2'
    },
    {
        emp_name: 'Denish Patel',
        emp_email: 'dp@vpninfotech.com',
        status: 'Active',
        actions: [<EditIcon color="primary" />, <VisibilityIcon color="Warning" />, <DeleteIcon color="secondary" />],
        sr_no: '3'
    },
    {
        emp_name: 'Nishil Prajapati',
        emp_email: 'np@vpninfotech.com',
        status: 'Active',
        actions: [<EditIcon color="primary" />, <VisibilityIcon color="Warning" />, <DeleteIcon color="secondary" />],
        sr_no: '4'
    },
    {
        emp_name: 'Ashish Narola',
        emp_email: 'an@vpninfotech.com',
        status: 'Active',
        actions: [<EditIcon color="primary" />, <VisibilityIcon color="Warning" />, <DeleteIcon color="secondary" />],
        sr_no: '5'
    },
    {
        emp_name: 'Forma Patel',
        emp_email: 'fp@vpninfotech.com',
        status: 'Active',
        actions: [<EditIcon color="primary" />, <VisibilityIcon color="Warning" />, <DeleteIcon color="secondary" />],
        sr_no: '6'
    },
]
export default employeeData;