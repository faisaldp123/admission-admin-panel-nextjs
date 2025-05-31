import { AccountBalance, Dashboard, MenuBook, Person, PersonSearch, VerifiedUser} from '@mui/icons-material';


export const adminLinks = [
    {
        label: "Dashboard",
        icon: <Dashboard/>,
        url: "/dashboard"
    },
    // 
    {
        label: "Students",
        icon: <PersonSearch/>,
        url: "/students"
    },
    {
        label: "Courses",
        icon: <MenuBook/>,
        url: "/courses"
    },
    {
            label: "Faculty",
            icon: <PersonSearch/>,
            url: "/faculty/list"
        },
        {
            label: "Transaction",
            icon: <AccountBalance/>,
            url: "/transaction"
        },
]

export const superAdminLinks = [
    {
        label: "Dashboard",
        icon: <Dashboard/>,
        url: "/dashboard"
    },
    {
        label: "Users",
        icon: <Person/>,
        url: "/users"
    },
]