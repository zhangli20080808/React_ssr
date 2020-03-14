import React, { Component } from 'react';

class NotFind extends Component {

    UNSAFE_componentWillMount() {
        const { staticContext } = this.props
        // 这段只在服务端适用 如果staticContext存在  继续向下执行
        staticContext && (staticContext.notFind = true)
    }
    render() {

        return (
            <div>
                not find
			</div>
        )
    }
}


export default NotFind
