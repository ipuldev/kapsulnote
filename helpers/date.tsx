interface month {
    id: number
    name: string
}

export const months = [
    {
        "id": 0,
        "name": "January",
        "shortName": "Jan"
    },
    {
        "id": 1,
        "name": "February",
        "shortName": "Feb"
    },
    {
        "id": 2,
        "name": "March",
        "shortName": "Mar"
    },
    {
        "id": 3,
        "name": "April",
        "shortName": "Apr"
    },
    {
        "id": 4,
        "name": "May",
        "shortName": "May"
    },
    {
        "id": 5,
        "name": "June",
        "shortName": "Jun"
    },
    {
        "id": 6,
        "name": "July",
        "shortName": "Jul"
    },
    {
        "id": 7,
        "name": "August",
        "shortName": "Aug"
    },
    {
        "id": 8,
        "name": "September",
        "shortName": "Sep"
    },
    {
        "id": 9,
        "name": "October",
        "shortName": "Oct"
    },
    {
        "id": 10,
        "name": "November",
        "shortName": "Nov"
    },
    {
        "id": 11,
        "name": "December",
        "shortName": "Dec"
    }        
];

export function formatDate(date: Date, format?: "d-m-y" | "d MM y") {
    const year = date.getFullYear();
    let month;
    switch (format) {
        case "d-m-y":
                month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
        case "d MM y":
                 month = months.find(month => month.id == date.getMonth());
                return `${date.getDate()} ${month?.name} ${date.getFullYear()}`;
        default:
            const today = new Date();
            const isToday = (date: Date): boolean => {
                return date.getDate() === today.getDate() &&
                       date.getMonth() === today.getMonth() &&
                       date.getFullYear() === today.getFullYear();
              };
            
            const yesterday = new Date();
            yesterday.setDate(today.getDate() - 1);
            const isYesterday = (date: Date): boolean => {
            return date.getDate() === yesterday.getDate() &&
                    date.getMonth() === yesterday.getMonth() &&
                    date.getFullYear() === yesterday.getFullYear();
            }; 

            if (isToday(date)) {
                return "Today";
            } else if (isYesterday(date)) {
                return "Yesterday";
            } else {
                const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
                return date.toLocaleDateString('en-GB', options);
            }
    }
}