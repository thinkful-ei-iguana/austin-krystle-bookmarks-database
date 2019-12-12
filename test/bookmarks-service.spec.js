const BookmarksService = require('../src/bookmarks-service')
const knex = require('knex')

describe(`Bookmarks service object`, function() {
    let db 
    let testItems = [
        {
            id: 4,
            url: 'www.testurl1.com', 
            title: 'test1', 
            rating: '4', 
            description: 'testbookmark'
        },
        {
            id: 5,
            url: 'www.testurl2.com', 
            title: 'test2', 
            rating: '4', 
            description: 'testbookmark2'
        },
        {
            id: 3,
            url: 'www.testurl3.com', 
            title: 'test3', 
            rating: '4', 
            description: 'testbookmark3'
        }
    ]
        before(() => {
            db = knex({
                clieng: 'pg',
                connection: process.env.TEST_DB_URL,
            })
        })

        before(() => db('bookmarks').truncate())

        afterEach(() => db('bookmarks').truncate())

        after(() => db.destroy())


    context(`Given 'bookmarks' has data`, () => {
        beforeEach(() => {
            return db
            .into('bookmarks')
            .insert(testItems)
        })

        it(`getAllBookmarks() resolves all bookmarks from 'bookmarks' table`, () => {
            return BookmarksService.getAllBookmarks(db)
                .then(actual => {
                    expect(actual).to.eql(testItems)
                })
        })

        it(`getById() resolves a Bookmark by id from 'bookmarks' table`, () => {
            const thirdId = 3
            const thirdTestItem = testItems[thirdId - 1]
            return BookmarksService.getById(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: thirdId,
                        url: thirdTestItem.url,
                        title: thirdTestItem.title,
                        rating: thirdTestItem.rating,
                        description: thirdTestItem.description,
                    })
                })
        })

        it(`deleteBookmark() removes a bookmark by id from 'bookmarks' table`, () => {
            const itemId = 3
            return BookmarksService.deleteBookmark(db, itemId)
                .then(() => BookmarksService.getAllBookmarks(db))
                .then(allBookmarks => {
                    const expected = testItems.filter(item => item.id !== itemId)
                    expect(allBookmarks).to.eql(expected)
                })
        })

        it(`updateBookmark() updates a bookmark from the 'bookmarks' table`, () => {
            const idToUpdate = 3
            const newBookmarkData = {
                title: 'updated title',
                url: 'updated url',
                rating: 'updated rating',
                description: 'updated description',
            }
            return BookmarksService.updateBookmark(db, idToUpdate, newBookmarkData)
                .then(() => BookmarksService.getById(db, idToUpdate))
                .then(item => {
                    expect(item).to.eql({
                        id: idToUpdate,
                        ...newBookmarkData,
                    })
                })
        })
    })

    context(`Given 'bookmarks' has no data`, () => {
        it(`getAllBookmarks() resolves an empty array`, () => {
            return BookmarksService.getAllBookmarks(db)
            .then(actual => {
                expect(actual).to.eql([])
            })
        })

        it(`insertBookmark() inserts a new bookmark and resolves the new bookmark with an 'id'`, () => {
            const newBookmark = {
                id: 1,
                url: 'test new url',
                title: 'test new title',
                rating: 'test new rating',
                description: 'test new description',
            }
            return BookmarksService.insertBookmark(db, newBookmark)
                .then(actual => {
                    expect(actual).to.eql({
                        id: newBookmark.id,
                        url: newBookmark.url,
                        title: newBookmark.title,
                        rating: newBookmark.rating,
                        description: newBookmark.description,
                    })
                })
        })
    })
})