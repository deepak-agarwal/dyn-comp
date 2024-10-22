import React, { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ hasError: true })
    // You can also log the error information here
    console.error(error, errorInfo)
  }

  render() {
    
    if (this.state.hasError) {
      // Return your fallback component or an error message
      return (
        <div>
          An error occurred while displaying the component. Please try again.
        </div>
      );
    }
    return this.props.children
  }
}

export default ErrorBoundary
