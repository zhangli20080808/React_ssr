import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getTranslationList } from './store/actions';
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import styles from './style.css'
import withStyle from '../../withStyle'

class Translation extends Component {

    getList() {
        const { list } = this.props;
        return list.map(item => <div key={item.id}>{item.title}</div>)
    }

    render() {
        return this.props.login ? (
            <Fragment>
                <Helmet>
                    <title>
                        translate
					</title>
                    <meta name='descrption' content='公司归属感山沟沟'>
                    </meta>
                </Helmet>
                <div className={styles.test}>{this.getList()}</div>
            </Fragment>
        ) : <Redirect to='/' />
    }

    componentDidMount() {
        if (!this.props.list.length) {
            this.props.getTranslationList();
        }
    }
}

const mapStateToProps = state => ({
    list: state.translation.translationList,
    login: state.header.login
});

const mapDispatchToProps = dispatch => ({
    getTranslationList() {
        dispatch(getTranslationList());
    }
})

const ExportTranslation = connect(mapStateToProps, mapDispatchToProps)(withStyle(Translation, styles));

ExportTranslation.loadData = (store) => {
    // 这个函数，负责在服务器端渲染之前，把这个路由需要的数据提前加载好
    return store.dispatch(getTranslationList())
}

export default ExportTranslation