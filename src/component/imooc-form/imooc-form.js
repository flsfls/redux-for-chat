import React from 'react'

export default function imoocForm(Comp) {
  class WrapComp extends React.Component{
    constructor(props) {
      super(props)
      this.state = {}
    }
    handleChange(key, val) {
      console.log(key,val)
      this.setState({
        [key]: val
      })
    }

    render() {
      return <Comp handleChange={this.handleChange.bind(this)}
                state={this.state} {...this.props}></Comp>
    }
  }
  return WrapComp
}
