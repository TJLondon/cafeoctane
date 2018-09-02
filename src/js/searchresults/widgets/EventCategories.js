import axios from 'axios';
import {Link} from 'react-router-dom';
import React from 'react';

const CategoryPreview = (props) => {

    let imageStyle = {
        backgroundImage: 'url(/assets/img/categories/' + props.link + '.jpg)'
    };
    return (
        <article className="category-item">
            <Link to={'/events/find/' + props.link }>
            <div className="thumb" style={imageStyle}>&nbsp;</div>
            <div className="grad"/>
                <div className="article-copy">
                    <h4>{props.category}</h4>
                </div>
            </Link>
        </article>
    )
};
export default class EventCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: Object
        };
        this.handleSuccess = this.handleSuccess.bind(this);
    }

    handleSuccess = (categories) => {
      this.setState({
          categories: categories.data
      });
    };

    handleError = (error) => {

    };

    componentDidMount() {
        axios.get('/api/categories')
            .then(res => this.handleSuccess(res))
            .catch(error => this.handleError(error))
    }

    render() {
        return (
            <div className="category-home">
                {Object.keys(this.state.categories).map(Id =>
                    <CategoryPreview
                        key={Id}
                        category={this.state.categories[Id].eventTypeTitle}
                        link={this.state.categories[Id].eventTypeTitle.replace(/\s+/g, '-').toLowerCase()} />
                        )}
                    </div>
                )
    }

};