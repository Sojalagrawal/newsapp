import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'


import {
    Route,
    Routes
  } from "react-router-dom";


export default class App extends Component {
  pageSize=9;
  apiKey ="c303a4c7937b4cbcab2bee17c88ec25d"
  state={
    progress:0
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
          <Navbar/>
          <LoadingBar
              color='#f11946'
              progress={this.state.progress}
              height={2}
              onLoaderFinished={() => this.setProgress(0)}
              loaderSpeed={500}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="/" pageSize={this.pageSize} country="in" category="general"/>}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="business"pageSize={this.pageSize} country="in" category="business"/>}></Route> 
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>}></Route> 
            <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general"/>}></Route> 
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health"/>}></Route> 
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science"/>}></Route> 
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports"/>}></Route> 
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology"/>}></Route> 
          </Routes> 
          
      </div>
    )
  }
}
