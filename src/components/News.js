import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export default class News extends Component {
    static defaultProps={
      country:'in',
      pageSize:6,
      category:"general"
    }
    static propTypes={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string
    }


    constructor(props){
        super(props);
        // console.log("i am a constructor from news component");
        this.state={
            articles:[],
            loading:false,
            page:1,
            total:0
        }
        // document.title=this.props.category;
        document.title=`${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}-News Monkey`;
        
    }
    
    async componentDidMount(){
      //phle render chlta h phr componentDidMount
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c303a4c7937b4cbcab2bee17c88ec25d&pageSize=${this.props.pageSize}`
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData=await data.json();
      console.log(parsedData)
      this.setState({articles:parsedData.articles,total:parsedData.totalResults,loading:false})
      //idhar hm update news call kr skte h upar ka code htakr
    }

    async updateNews(){
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c303a4c7937b4cbcab2bee17c88ec25d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData=await data.json();
      this.setState({articles:parsedData.articles})
      this.setState({
        loading:false
      })
    }
 


    handlePrevClick=async()=>{
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c303a4c7937b4cbcab2bee17c88ec25d&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true});
      // let data = await fetch(url);
      // let parsedData=await data.json();
      // this.setState({articles:parsedData.articles})
      // this.setState({
      //   page:this.state.page-1,
      //   loading:false
      // })


      this.setState({
        page:this.state.page-1
      })
      this.updateNews();
    }


     handleNextClick=async()=>{
      //  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c303a4c7937b4cbcab2bee17c88ec25d&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      //  this.setState({loading:true});
      //  let data = await fetch(url);
      //  let parsedData=await data.json();
      //  this.setState({articles:parsedData.articles})
      //  this.setState({
      //    page:this.state.page+1,
      //    loading:false

      //  })

      //for a common func update news
      this.setState({
        page:this.state.page+1
      });
      this.updateNews();

    }
  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center'>NewsMonkey-Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className='row'>
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
                <NewsItem  title={element.title?element.title.substring(0,45):""} description={element.description?element.description.substring(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
            </div>
        })}
            
        </div>
        <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; previous</button>
            <button disabled={this.state.page>=Math.ceil(this.state.total/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}> next &rarr;</button>
        </div>
        
      </div>
    )
  }
}
