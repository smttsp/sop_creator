import Logo from "./Logo"
import FooterContact from "./FooterContact"
const Footer=()=>{
    return (<div className=" flexBetween flex-2 bg-blue-80 h-100 text-white text-7xl font-bold px-6">
            <Logo/>
            <FooterContact/>

          </div>)
}
export default Footer