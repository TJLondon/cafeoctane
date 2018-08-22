import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { withRouter } from "react-router-dom";

const Layout = (props) => {
        return (
            <div className="layout">
                <Header />
                {props.children}
                <Footer />
            </div>
        )
};

// class Layout extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             user: null,
//             error: null
//         };
//     }
//
//     componentDidMount() {
//         if (document.cookie.indexOf("usertoken") > 0) {
//             axios.get('/auth/user')
//                 .then(res => this.handleUserSuccess(res.data))
//                 .catch(error => this.handleUserError(error));
//         }
//         //console.log(this.props);
//         this.handleUserSuccess = this.handleUserSuccess.bind(this);
//     }
//
//     handleUserSuccess(data) {
//         if (data[0].email) {
//             this.setState({user: data[0]})
//         }
//     }
//
//     handleUserError(error) {
//         this.setState(error)
//     }
//
//
//     render() {
//         return (
//             <div className="layout">
//                 <Header user={this.state.user} />
//                 {this.props.children}
//                 <Footer />
//             </div>
//         )
//     }
// }

export default withRouter(Layout)