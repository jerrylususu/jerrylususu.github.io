---
title: 用 JSON 数据列派生出关系数据库中的其他列
date: 2025-06-10T14:54:23.047Z
---

一个看起来很奇妙，细想下似乎又有点道理的 SQL 建表方式：Data 列存储真正的数据（JSON），其他列都从 Data 派生而来。基本上是半个文档数据库？

```sql
CREATE TABLE IF NOT EXISTS Cookie (  
  Cookie   TEXT    NOT NULL AS (Data->>'cookie')  STORED UNIQUE, -- PK
  UserID   INTEGER NOT NULL AS (Data->>'user_id') STORED REFERENCES User (UserID),  
  Created  INTEGER NOT NULL AS (unixepoch(Data->>'created')) STORED,  
  LastUsed INTEGER AS (unixepoch(Data->>'last_used')) CHECK (LastUsed>0),  
  Data     JSONB   NOT NULL  
);
```



via: https://crawshaw.io/blog/programming-with-agents