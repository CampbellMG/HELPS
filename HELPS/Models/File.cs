using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HELPS.Models
{
    public class FileInfo
    {
        public FileInfo()
        {
        }

        public FileInfo(int id, string name)
        {
            Id = id;
            Name = name;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
    }
    
    public class File: FileInfo
    {
        public byte[] Data { get; set; }
    }
}