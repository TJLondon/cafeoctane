import Cookies from 'universal-cookie';
import React from 'react';

const cookies = new Cookies();
class CookieBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerClass: 'show'
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick = (e) => {
        e.preventDefault();
        cookies.set('anonymous','false');
        this.setState({bannerClass: 'hide'})
    };

    view() {
        if (!cookies.get('anonymous')) {
            return (
                <div className={'cookieBanner ' + this.state.bannerClass}>
                    <div className="container">
                        <p>We're using cookies to improve your Cafe Octane experience. You can review our <a
                            href="/cookies">cookie policey</a> for more details, otherwise
                            we'll assume you're ok with this.</p>
                        <a href="#" onClick={this.handleClick} className="closeBanner"><i
                            className="material-icons">close</i></a>
                    </div>

                </div>
            )
        }
        else {
            return null
        }
    }

    render() {
        return (
            <div>
                {this.view()}
            </div>
        )
    }
};

export default CookieBanner