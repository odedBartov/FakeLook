USE [master]
GO
/****** Object:  Database [fakeLookDB]    Script Date: 2/24/2020 3:53:21 PM ******/
CREATE DATABASE [fakeLookDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'fakeLookDB_Data', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\fakeLookDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'fakeLookDB_Log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\fakeLookDB.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [fakeLookDB] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [fakeLookDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [fakeLookDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [fakeLookDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [fakeLookDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [fakeLookDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [fakeLookDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [fakeLookDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [fakeLookDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [fakeLookDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [fakeLookDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [fakeLookDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [fakeLookDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [fakeLookDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [fakeLookDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [fakeLookDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [fakeLookDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [fakeLookDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [fakeLookDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [fakeLookDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [fakeLookDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [fakeLookDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [fakeLookDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [fakeLookDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [fakeLookDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [fakeLookDB] SET  MULTI_USER 
GO
ALTER DATABASE [fakeLookDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [fakeLookDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [fakeLookDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [fakeLookDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [fakeLookDB] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'fakeLookDB', N'ON'
GO
ALTER DATABASE [fakeLookDB] SET QUERY_STORE = OFF
GO
USE [fakeLookDB]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [fakeLookDB]
GO
/****** Object:  User [mushki]    Script Date: 2/24/2020 3:53:23 PM ******/
CREATE USER [mushki] FOR LOGIN [mushki] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [mushki]
GO
/****** Object:  UserDefinedTableType [dbo].[tags_list]    Script Date: 2/24/2020 3:53:23 PM ******/
CREATE TYPE [dbo].[tags_list] AS TABLE(
	[title] [nvarchar](20) NULL,
	[Id] [int] NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
/****** Object:  UserDefinedTableType [dbo].[userTags_list]    Script Date: 2/24/2020 3:53:23 PM ******/
CREATE TYPE [dbo].[userTags_list] AS TABLE(
	[username] [nvarchar](20) NULL,
	[Id] [int] NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
/****** Object:  Table [dbo].[comments]    Script Date: 2/24/2020 3:53:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[comments](
	[commentId] [bigint] IDENTITY(1,1) NOT NULL,
	[postId] [bigint] NOT NULL,
	[userId] [bigint] NOT NULL,
	[date] [date] NOT NULL,
	[text] [nvarchar](200) NOT NULL,
 CONSTRAINT [PK_Comments] PRIMARY KEY CLUSTERED 
(
	[commentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[groups]    Script Date: 2/24/2020 3:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[groups](
	[name] [nvarchar](50) NOT NULL,
	[managerId] [bigint] NOT NULL,
 CONSTRAINT [PK_Groups] PRIMARY KEY CLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[like_comment]    Script Date: 2/24/2020 3:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[like_comment](
	[commentId] [bigint] NOT NULL,
	[userId] [bigint] NOT NULL,
 CONSTRAINT [PK_like_comment] PRIMARY KEY CLUSTERED 
(
	[commentId] ASC,
	[userId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[like_post]    Script Date: 2/24/2020 3:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[like_post](
	[postId] [bigint] NOT NULL,
	[userId] [bigint] NOT NULL,
 CONSTRAINT [PK_like_post] PRIMARY KEY CLUSTERED 
(
	[postId] ASC,
	[userId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[posts]    Script Date: 2/24/2020 3:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[posts](
	[postId] [bigint] IDENTITY(1,1) NOT NULL,
	[userUpId] [bigint] NOT NULL,
	[imageSrc] [nvarchar](70) NOT NULL,
	[publishedDate] [date] NOT NULL,
	[text] [nvarchar](300) NULL,
	[position] [geography] NOT NULL,
 CONSTRAINT [PK_Posts] PRIMARY KEY CLUSTERED 
(
	[postId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tag_image]    Script Date: 2/24/2020 3:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tag_image](
	[title] [nvarchar](50) NOT NULL,
	[postId] [bigint] NOT NULL,
 CONSTRAINT [PK_tag_post] PRIMARY KEY CLUSTERED 
(
	[title] ASC,
	[postId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tag_user]    Script Date: 2/24/2020 3:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tag_user](
	[postId] [bigint] NOT NULL,
	[taggedUserId] [bigint] NOT NULL,
 CONSTRAINT [PK_tags_users] PRIMARY KEY CLUSTERED 
(
	[postId] ASC,
	[taggedUserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_freind]    Script Date: 2/24/2020 3:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_freind](
	[userId] [bigint] NOT NULL,
	[freindId] [bigint] NOT NULL,
	[isFollowed] [bit] NOT NULL,
 CONSTRAINT [PK_users_freinds] PRIMARY KEY CLUSTERED 
(
	[userId] ASC,
	[freindId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_group]    Script Date: 2/24/2020 3:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_group](
	[freindId] [bigint] NOT NULL,
	[nameOfGroup] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_users_groups] PRIMARY KEY CLUSTERED 
(
	[freindId] ASC,
	[nameOfGroup] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 2/24/2020 3:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[userId] [bigint] IDENTITY(1,1) NOT NULL,
	[firstName] [nvarchar](20) NULL,
	[lastName] [nvarchar](20) NULL,
	[email] [nvarchar](30) NOT NULL,
	[username] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[userId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Posts] FOREIGN KEY([postId])
REFERENCES [dbo].[posts] ([postId])
GO
ALTER TABLE [dbo].[comments] CHECK CONSTRAINT [FK_Comments_Posts]
GO
ALTER TABLE [dbo].[comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Users] FOREIGN KEY([userId])
REFERENCES [dbo].[users] ([userId])
GO
ALTER TABLE [dbo].[comments] CHECK CONSTRAINT [FK_Comments_Users]
GO
ALTER TABLE [dbo].[groups]  WITH CHECK ADD  CONSTRAINT [FK_Groups_Users] FOREIGN KEY([managerId])
REFERENCES [dbo].[users] ([userId])
GO
ALTER TABLE [dbo].[groups] CHECK CONSTRAINT [FK_Groups_Users]
GO
ALTER TABLE [dbo].[like_comment]  WITH CHECK ADD  CONSTRAINT [FK_like_comment_Comment] FOREIGN KEY([commentId])
REFERENCES [dbo].[comments] ([commentId])
GO
ALTER TABLE [dbo].[like_comment] CHECK CONSTRAINT [FK_like_comment_Comment]
GO
ALTER TABLE [dbo].[like_comment]  WITH CHECK ADD  CONSTRAINT [FK_like_comment_User] FOREIGN KEY([userId])
REFERENCES [dbo].[users] ([userId])
GO
ALTER TABLE [dbo].[like_comment] CHECK CONSTRAINT [FK_like_comment_User]
GO
ALTER TABLE [dbo].[like_post]  WITH CHECK ADD  CONSTRAINT [FK_like_post_Post] FOREIGN KEY([postId])
REFERENCES [dbo].[posts] ([postId])
GO
ALTER TABLE [dbo].[like_post] CHECK CONSTRAINT [FK_like_post_Post]
GO
ALTER TABLE [dbo].[like_post]  WITH CHECK ADD  CONSTRAINT [FK_like_post_User] FOREIGN KEY([userId])
REFERENCES [dbo].[users] ([userId])
GO
ALTER TABLE [dbo].[like_post] CHECK CONSTRAINT [FK_like_post_User]
GO
ALTER TABLE [dbo].[posts]  WITH CHECK ADD  CONSTRAINT [FK_Posts_Users] FOREIGN KEY([userUpId])
REFERENCES [dbo].[users] ([userId])
GO
ALTER TABLE [dbo].[posts] CHECK CONSTRAINT [FK_Posts_Users]
GO
ALTER TABLE [dbo].[tag_image]  WITH CHECK ADD  CONSTRAINT [FK_tag_post_Post] FOREIGN KEY([postId])
REFERENCES [dbo].[posts] ([postId])
GO
ALTER TABLE [dbo].[tag_image] CHECK CONSTRAINT [FK_tag_post_Post]
GO
ALTER TABLE [dbo].[tag_user]  WITH CHECK ADD  CONSTRAINT [FK_tags_users_Posts] FOREIGN KEY([postId])
REFERENCES [dbo].[posts] ([postId])
GO
ALTER TABLE [dbo].[tag_user] CHECK CONSTRAINT [FK_tags_users_Posts]
GO
ALTER TABLE [dbo].[tag_user]  WITH CHECK ADD  CONSTRAINT [FK_tags_users_Users] FOREIGN KEY([taggedUserId])
REFERENCES [dbo].[users] ([userId])
GO
ALTER TABLE [dbo].[tag_user] CHECK CONSTRAINT [FK_tags_users_Users]
GO
ALTER TABLE [dbo].[user_freind]  WITH CHECK ADD  CONSTRAINT [FK_users_freinds_Users] FOREIGN KEY([userId])
REFERENCES [dbo].[users] ([userId])
GO
ALTER TABLE [dbo].[user_freind] CHECK CONSTRAINT [FK_users_freinds_Users]
GO
ALTER TABLE [dbo].[user_freind]  WITH CHECK ADD  CONSTRAINT [FK_users_freinds_Users1] FOREIGN KEY([freindId])
REFERENCES [dbo].[users] ([userId])
GO
ALTER TABLE [dbo].[user_freind] CHECK CONSTRAINT [FK_users_freinds_Users1]
GO
ALTER TABLE [dbo].[user_group]  WITH CHECK ADD  CONSTRAINT [FK_users_groups_Groups] FOREIGN KEY([nameOfGroup])
REFERENCES [dbo].[groups] ([name])
GO
ALTER TABLE [dbo].[user_group] CHECK CONSTRAINT [FK_users_groups_Groups]
GO
ALTER TABLE [dbo].[user_group]  WITH CHECK ADD  CONSTRAINT [FK_users_groups_Users] FOREIGN KEY([freindId])
REFERENCES [dbo].[users] ([userId])
GO
ALTER TABLE [dbo].[user_group] CHECK CONSTRAINT [FK_users_groups_Users]
GO
/****** Object:  StoredProcedure [dbo].[SP_CheckIfUserLikedPost]    Script Date: 2/24/2020 3:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_CheckIfUserLikedPost] 
	-- Add the parameters for the stored procedure here
	 @postId bigint,
	 @userId bigint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	--if not exist --?
    -- Insert statements for procedure here
	select TOP 1 *
	from like_post
	WHERE postId = @postId
	and userId = @userId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CheckIfUsernamesExist]    Script Date: 2/24/2020 3:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_CheckIfUsernamesExist] 
	-- Add the parameters for the stored procedure here
	 @usernames nvarchar(max)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON	
	SELECT J.username
	FROM OPENJSON(@usernames) with(username nvarchar(20)) AS J
	where J.username not in (select username
	from users)
END
GO
/****** Object:  StoredProcedure [dbo].[SP_DisLikePost]    Script Date: 2/24/2020 3:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_DisLikePost] 
	-- Add the parameters for the stored procedure here
	 @postId bigint,
	 @userId bigint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	--if not exist --?
    -- Insert statements for procedure here
	DELETE FROM like_post
    WHERE postId = @postId
	AND userId = @userId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPost]    Script Date: 2/24/2020 3:53:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_GetPost] 
	-- Add the parameters for the stored procedure here
	 @postId bigint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;
	--if not exist --?
    -- Insert statements for procedure here
	select top 1 *
	from posts
	where postId = @postId

	select title
	from tag_image
	where tag_image.postId = @postId

	select username
	from tag_user
	join users on tag_user.taggedUserId = users.userId
	where postId = @postId

	select count (like_post.postId) as likes
	from like_post
	where postId = @postId

	select comments.text, comments.date, comments.commentId, users.username
	from comments join users
	on comments.userId = users.userId
	and comments.postId = @postId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPosts]    Script Date: 2/24/2020 3:53:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_GetPosts] 
	 @dateFrom date,
	 @dateTo date,
	 @radius float,
	 @users nvarchar(max),
	 @imageTags nvarchar(max),
	 @currentLatitude float,
	 @currentLongitude float
AS
BEGIN
	SET NOCOUNT ON;
	if @radius is not null
	begin
		declare @location as geography = geography::Point(@currentLatitude, @currentLongitude, 4326)
		declare @range as geography = @location.STBuffer(@radius)
	end
	select postId, imageSrc, position.Lat as latitude, position.Long as longitude, @radius as radius
	from posts
	where ((posts.publishedDate > @dateFrom)
	or @dateFrom is null)

	and ((posts.publishedDate < @dateTo) 
	or @dateTo is null)
	
	and ((posts.postId in (
	select tag_user.postId
	from tag_user
	where tag_user.taggedUserId in(
	(select users.userId
	from openjson(@users)
	with(UN nvarchar(20))
	join users
	on users.username = UN))
	))
	or @users is null)

	and ((posts.postId in(
	select tag_image.postId
	from openjson(@imageTags)
	with (imageTag nvarchar(20))
	join tag_image
	on tag_image.title = imageTag))
	or @imageTags is null)

	and (
	(posts.position.STDistance(@location) < @radius)
	or @radius is null)
END
GO
/****** Object:  StoredProcedure [dbo].[SP_InsertImageTag]    Script Date: 2/24/2020 3:53:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_InsertImageTag] 
	-- Add the parameters for the stored procedure here
	 @title nvarchar(50),
	 @postId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    declare @tagId bigint;

    -- Insert statements for procedure here
  BEGIN TRANSACTION
  --IF NOT EXISTS (SELECT title FROM tags WHERE title = @title)
  --INSERT INTO tags(title)
  --VALUES (@title)

  --SET @tagId = (SELECT tagId FROM tags WHERE title=@title)

  --INSERT INTO tag_image(postId,tagId)
  --VALUES (@postId,@tagId)
  COMMIT
END
GO
/****** Object:  StoredProcedure [dbo].[SP_InsertPost]    Script Date: 2/24/2020 3:53:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_InsertPost] 
	-- Add the parameters for the stored procedure here
	@postData NVARCHAR(max),
	@imageTags nvarchar(max),
    @taggedUsers nvarchar(max)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

BEGIN TRANSACTION
  --insert data of post to post table
  INSERT INTO posts(userUpId,imageSrc,publishedDate,text,position)
  VALUES (
  JSON_VALUE(@postData, '$.userUpId'),
  JSON_VALUE(@postData, '$.imageSrc'),
  JSON_VALUE(@postData, '$.publishedDate'),
  JSON_VALUE(@postData, '$.text'),
  geography::Point( JSON_VALUE(@postData, '$.latitude'),JSON_VALUE(@postData, '$.longitude'), 4326))

  DECLARE @postId bigint = SCOPE_IDENTITY()

  if(@imageTags is not null or  @taggedUsers is not null)
  begin
  INSERT INTO tag_image(title,postId)
  SELECT imageTag,@postId 
  FROM OPENJSON(@imageTags) 
  with(imageTag nvarchar(20))
  where imageTag is not null

  insert into tag_user (taggedUserId, postId)
  select users.userId, @postId
  from openjson(@taggedUsers)
  with (UN nvarchar(20))
  join users on users.username = UN

  ---convert to table
  --declare @usernames table(username nvarchar(20),id bigint primary key identity);
  --insert into @usernames(username)
  --SELECT username 
  --FROM OPENJSON(@taggedUsers) 
  --with(username nvarchar(20))
  --where username is not null

  --DECLARE @size int = (select count(*) from @usernames);
  --DECLARE @currentId bigint;
  --DECLARE @currentUsername nvarchar(50);

  --WHILE(@size>0)
  --begin
  --SET @currentUsername = (SELECT username FROM @usernames WHERE id=@size)
  --SET @currentId = (select userId from users where username=@currentUsername)

  --if(@currentId is null)
  --INSERT INTO tag_user(taggedUserId,postId)
  --VALUES(@currentId,@postId)

  --set @size= @size-1
  --end
  end
  COMMIT
END
GO
/****** Object:  StoredProcedure [dbo].[SP_InsertUser]    Script Date: 2/24/2020 3:53:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_InsertUser] 
	-- Add the parameters for the stored procedure here
	 @userId bigint,
	 @userName nvarchar(20),
	 @email nvarchar(30)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	--if not exist --?
	SET IDENTITY_INSERT users ON	
    -- Insert statements for procedure here
	INSERT INTO users(userId, username, email)
    VALUES (@userId,@userName, @email)
END
GO
/****** Object:  StoredProcedure [dbo].[SP_InsertUserTag]    Script Date: 2/24/2020 3:53:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_InsertUserTag]
	-- Add the parameters for the stored procedure here
	 @taggedUsername nvarchar(20),
	 @postId bigint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	declare @taggedUserId bigint;


	BEGIN TRANSACTION
	SET @taggedUserId = (SELECT userId FROM users WHERE username=@taggedUsername)

	IF (@taggedUserId IS NOT NULL)
    INSERT INTO tag_user(postId,taggedUserId)
    VALUES (@postId,@taggedUserId)

	COMMIT



END
GO
/****** Object:  StoredProcedure [dbo].[SP_LikePost]    Script Date: 2/24/2020 3:53:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_LikePost] 
	-- Add the parameters for the stored procedure here
	 @postId bigint,
	 @userId bigint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	--if not exist --?
    -- Insert statements for procedure here
	INSERT INTO like_post(postId,userId)
    VALUES (@postId,@userId)
END
GO
/****** Object:  StoredProcedure [dbo].[SP_PublishComment]    Script Date: 2/24/2020 3:53:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_PublishComment] 
	-- Add the parameters for the stored procedure here
	 @postId bigint,
	 @userId bigint,
	 @text nvarchar(200),
	 @date date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	--if not exist --?
    -- Insert statements for procedure here
	INSERT INTO comments(postId,userId,text,date)
    VALUES (@postId,@userId,@text,@date)
END
GO
USE [master]
GO
ALTER DATABASE [fakeLookDB] SET  READ_WRITE 
GO
