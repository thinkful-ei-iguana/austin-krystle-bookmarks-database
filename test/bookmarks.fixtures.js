
function makeBookmarksArray() {
    return [  
    {
        id: 4,
        url: 'www.testurl1.com', 
        title: 'test1', 
        rating: '4', 
        description: 'testbookmark',
        tag: 'Saved Site',
        style: 'Bookmarks list 1'
    },
    {
        id: 2,
        url: 'www.testurl2.com', 
        title: 'test2', 
        rating: '4', 
        description: 'testbookmark2',
        tag: 'Saved Site',
        style: 'Bookmarks list 1'
    },
    {
        id: 3,
        url: 'www.testurl3.com', 
        title: 'test3', 
        rating: '4', 
        description: 'testbookmark3',
        tag: 'Saved Site',
        style: 'Bookmarks list 1'
    },
    ];
}

module.exports = {
    makeBookmarksArray,
}