
import { NavLink, useHistory } from 'react-router-dom'
import { isLoggedIn, signout } from '../../auth/index'
import './NavBar.css'

export default function NavBar() {
   const history = useHistory()
   
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <NavLink to="/"       
                    activeClassName="navbar__link--active"
                    className="navbar__link">
                      TIC-TAC-TOE
                    </NavLink>
                </li>
             {/* user is signed in and has username */}
                { isLoggedIn() && (
                    <>
                      <li className="push-left">
                         <button onClick={() =>
                                    signout(() => {
                                        window.location.reload();
                                    })
              }>Sign Out</button>
                      </li>
                    </>
                )}

              {/* user is not signed in and does not have username   */}
                {!isLoggedIn() && (
                    <>
                    <li class="push-left">
                        <NavLink to="/login" 
                              activeClassName="navbar__link--active"
                              className="navbar__link">
                        Sign in
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register"
                        activeClassName="navbar__link--active"
                        className="navbar__link" 
                        >
                            Register
                        </NavLink>
                    </li>
                    </>
                )}
            </ul>
        </nav>
    )
}
