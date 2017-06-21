CREATE TABLE [dbo].[Chat](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[dt] [datetime] NOT NULL,
	[usr] [nvarchar](50) NOT NULL,
	[msg] [nvarchar](max) NOT NULL
)

GO