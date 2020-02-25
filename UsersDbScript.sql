USE [master]
GO
/****** Object:  Database [UsersDB]    Script Date: 2/24/2020 3:54:53 PM ******/
CREATE DATABASE [UsersDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'UsersDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\UsersDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'UsersDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\UsersDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [UsersDB] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [UsersDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [UsersDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [UsersDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [UsersDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [UsersDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [UsersDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [UsersDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [UsersDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [UsersDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [UsersDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [UsersDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [UsersDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [UsersDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [UsersDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [UsersDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [UsersDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [UsersDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [UsersDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [UsersDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [UsersDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [UsersDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [UsersDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [UsersDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [UsersDB] SET RECOVERY FULL 
GO
ALTER DATABASE [UsersDB] SET  MULTI_USER 
GO
ALTER DATABASE [UsersDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [UsersDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [UsersDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [UsersDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [UsersDB] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'UsersDB', N'ON'
GO
ALTER DATABASE [UsersDB] SET QUERY_STORE = OFF
GO
USE [UsersDB]
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
USE [UsersDB]
GO
/****** Object:  User [oded]    Script Date: 2/24/2020 3:54:54 PM ******/
CREATE USER [oded] FOR LOGIN [oded] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [oded]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2/24/2020 3:54:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NOT NULL,
	[Password] [nvarchar](60) NOT NULL,
	[Email] [nchar](30) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[SP_CheckUserName]    Script Date: 2/24/2020 3:54:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_CheckUserName]
	-- Add the parameters for the stored procedure here
	@UserName nvarchar(15)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * from Users 
	where Name = @UserName
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPassword]    Script Date: 2/24/2020 3:54:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_GetPassword]
	-- Add the parameters for the stored procedure here
	@UserName nvarchar(15)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select Password, users.ID
	from Users
	where Name = @UserName
END
GO
/****** Object:  StoredProcedure [dbo].[SP_InsertUser]    Script Date: 2/24/2020 3:54:54 PM ******/
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
	@UserName nvarchar(20),
	@Password nvarchar(60),
	@Email nvarchar(30)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	insert into Users(Name, Password, Email)
	values(@UserName, @Password, @Email)
	SELECT SCOPE_IDENTITY() as createdUserId
END
GO
USE [master]
GO
ALTER DATABASE [UsersDB] SET  READ_WRITE 
GO
