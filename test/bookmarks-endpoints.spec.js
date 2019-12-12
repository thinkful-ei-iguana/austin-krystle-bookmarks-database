const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe.only('Bookmarks Endpoints', function() {
    let db 

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', ()=> db('bookmarks').truncate())

    afterEach('cleanup', () => db('bookmarks').truncate())

    context('Given there are bookmarks in the database', () => {
        const testBookmarks = [
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

        beforeEach('insert bookmarks', () => {
            return db
                .into('bookmarks')
                .insert(testBookmarks)
        })

        it('GET /bookmarks responds with 200 and all of the bookmarks', () => {
            return supertest(app)
            .get('/bookmarks')
            .expect(200, testBookmarks)
        })

        it('GET /bookmarks/:id responds with 200 and the specified bookmark', () => {
            const bookmarkId = 2
            const expectedBookmark = testBookmarks[bookmarkId - 1]
            return supertest(app)
            .get(`/bookmarks/${bookmarkId}`)
            .expect(200, expectedBookmark)
        })
    })
})