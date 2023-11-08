# NaturalLanguagePhotoAlbum
### Assignment #2 for Cloud Computing + Big Data - Photo Album Web Application with intelligent search (powered by Lex, OpenSearch, and Rekognition)
#### Serrana Aguirregaray, Nikhil Ghosh

[Notion Working doc](https://www.notion.so/Assignment-2-Natural-Language-Search-for-Photo-Album-App-22ea31c599e84133878323a72aefafb0?pvs=4)

## Description
Implement a photo album web application that can be searched using natural language
through both text and voice. You will learn how to use Lex, OpenSearch, and
Rekognition to create an intelligent search layer to query your photos for people,
objects, actions, landmarks and more.


## Functional Spec
At this point you should be able to:
1. Visit your photo album application using the S3 hosted URL.
2. Search photos using natural language via voice and text.
3. See relevant results (ex. If you searched for a cat, you should be able to see
photos with cats in them) based on what you searched.
4. Upload new photos (with or without custom labels) and see them appear in the
search results.

## Acceptance criteria:
1. Using the CloudFormation template (T1) you should be able to stand up the
entire functional stack for this assignment.
2. Once a new commit is pushed to GitHub (both for frontend and backend repos),
CodePipeline should build and deploy your code to the corresponding AWS
infrastructure.
3. For a given photo and a given search query, a correct search (as defined in the
assignment) should be able to return every photo that matches the query.
Specifically, if Rekognition returns 12 labels for a given photo, your search should
return the photo for any one of those 12 labels, if searched independently (“show
me dogs”) or in groups (“show me cats and dogs”).
a. Also, if you search for any custom label, the search should return all the
results with that custom label.
4. All other functionality should be working as described above.
