import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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
      this.props.setProgress(10);

      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`
      this.setState({loading:true});
      let data = await fetch(url);
      this.props.setProgress(30);

      let parsedData=await data.json();
      this.props.setProgress(100);

      this.setState({articles:parsedData.articles,total:parsedData.totalResults,loading:false})
    }

    async updateNews(){
      this.props.setProgress(10);
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      this.props.setProgress(30);

      let parsedData=await data.json();
      this.props.setProgress(100);

      this.setState({articles:this.state.articles.concat(parsedData.articles),loading:false})
      
    }
 
    fetchMoreData=()=>{
        this.setState({page:this.state.page+1})
        this.updateNews();
    };
  render() {
    return (
      <>
        <h2 className='text-center'>NewsMonkey-Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.total}
          loader= {this.hasMore?<Spinner/>:""}
        >
          <div className='container'>
            <div className='row'>
                {this.state.articles.map((element)=>{
                    return <div className='col-md-4' key={element.url}>
                        <NewsItem  title={element.title?element.title.substring(0,45):""} description={element.description?element.description.substring(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                    </div>
            })} 
           </div>
          </div>
        </InfiniteScroll>

      </>
        
    )
  }
}
