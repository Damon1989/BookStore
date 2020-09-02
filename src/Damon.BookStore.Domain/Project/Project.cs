using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Entities;

namespace Damon.BookStore.Project
{
    public class Project:IAggregateRoot<Guid>
    {
        public object[] GetKeys()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        ///  主键
        /// </summary>
        public Guid Id { get; }
        /// <summary>
        /// 项目编号 由财务审核最终给出
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        ///  申请中心
        /// </summary>
        public Center Apply { get; set; }
    }

    /// <summary>
    ///  中心数据
    /// </summary>
    public class Center
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
    }

    public class Employee
    {
        public string Id { get; set; }
        public string Code { get; set; }
    }
}
