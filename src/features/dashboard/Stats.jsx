/* eslint-disable react/prop-types */
import {
   HiOutlineBanknotes,
   HiOutlineBriefcase,
   HiOutlineCalendarDays,
   HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
function Stats({ bookings, confirmedStays, numDays, cabinCounts }) {
   const numBookings = bookings.length;
   const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
   const checkins = confirmedStays.length;
   //num checked in nights / all available nights (num days * num cabins)
   const occupation =
      confirmedStays.reduce((acc, stay) => acc + stay.numNights, 0) / (numDays * cabinCounts);

   return (
      <>
         <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numBookings} />
         <Stat
            title="Sales"
            color="green"
            icon={<HiOutlineBanknotes />}
            value={formatCurrency(sales)}
         />
         <Stat title="Check ins" color="indigo" icon={<HiOutlineCalendarDays />} value={checkins} />
         <Stat
            title="Occupancy Rate"
            color="yellow"
            icon={<HiOutlineChartBar />}
            value={`${Math.round(occupation * 100)}%`}
         />
      </>
   );
}

export default Stats;
