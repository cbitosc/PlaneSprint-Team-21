import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate , useParams} from "react-router-dom";
import PlacesPage from "./PlacesPage";

export default function AccountPage()
{
    const {user} = useContext(UserContext);
   
        if (!user)
        {
            return <Navigate to={'/login'}/>
        }
    
    const {subpage} = useParams();

    function linkClasses(type=null)
    {
            let classes =  'py-2 px-6';
            if((type === subpage)|| (subpage === undefined && type==="profile"))
            {
                classes += 'bg-primary text-white rounded-full';
            }
            return classes;
    }
    

        return (
        <div>
            <nav className="w-full flex justify-center mt-4 gap-8  ">
            <Link className={linkClasses("profile")}  to={'/account'}>My profile</Link>
            <Link className={linkClasses("bookings")} to={'/account/bookings'}>My bookings</Link>
            <Link className={linkClasses("accommodations")} to={'/account/places'}>My accommodations</Link>

            </nav>
        
        {subpage === 'profile' &&
        (
            <div className="text-center max-w-xl mx-auto">
                Logged in as {user.name} ({user.email})<br />
            <button className="primary max-w-sm mt-2"></button>
            </div> 
        )}

        {subpage === 'places' && (
            <PlacesPage/>
        )}
        
       </div>

    )
}