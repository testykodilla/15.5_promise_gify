App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText) { 
        this.setState({
          loading: true 
        });
        this.getGif(searchingText, function(gif) {  
          this.setState({ 
            loading: false, 
            gif: gif,  
            searchingText: searchingText 
          });
        }.bind(this));
      },
      
      getGif: function(searchingText, callback) {  
        var url = 'http://api.giphy.com/v1/gifs/search?q=' + searchingText + '&api_key=vbHVD8gM0h4cKfq4nD6L8EE7qARgHucy';  
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
               var data = JSON.parse(xhr.responseText).data;
               var gifNumberData = Math.floor(Math.random() * data.length);
               var gif = {  
                url: data[gifNumberData].images.fixed_width_downsampled.url,
                sourceUrl: data[gifNumberData].url
};
                callback(gif); 
            }
        };
        xhr.send();
    },

    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch}/>
            <Gif
                loading={this.state.loading}
                url={this.state.gif.url}
                sourceUrl={this.state.gif.sourceUrl}
            />>
          </div>
        );
    }
});