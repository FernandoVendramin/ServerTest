using System;
using System.Text;
using DevExtreme.AspNet.Mvc;
using DevExtreme.AspNet.Mvc.Builders;
using ServerTest.Utils;

namespace Server.UI.WithDevexpress.Extensions
{
    public static class DevExtremeDataGridExtensions
    {
        public static DataGridBuilder<T> OnRowInsertingWithChangeTracking<T>(this DataGridBuilder<T> dataGridBuilder, string jsBlock = "")
        {
            var script = new StringBuilder();
            script.Append("function(e) { e.data.StateChange = " + (int)StateChange.Inserted + ";");
            script.Append(jsBlock);
            script.Append("}");

            dataGridBuilder.OnRowInserting(script.ToString());

            return dataGridBuilder;
        }

        public static DataGridBuilder<T> OnRowUpdatingWithChangeTracking<T>(this DataGridBuilder<T> dataGridBuilder, string jsBlock = "")
        {
            var script = new StringBuilder();
            script.Append("function(e) { if(e.oldData.StateChange !== " + (int)StateChange.Inserted + ") { e.newData.StateChange = " + (int)StateChange.Updated + "; }");
            script.Append(jsBlock);
            script.Append("}");

            dataGridBuilder.OnRowUpdating(script.ToString());

            return dataGridBuilder;
        }

        public static DataGridBuilder<T> OnRowRemovingWithChangeTracking<T>(this DataGridBuilder<T> dataGridBuilder, string jsBlock = "")
        {
            var script = new StringBuilder();
            script.Append("function(e) { if(e.data.StateChange !== " + (int)StateChange.Inserted + ") { e.component.getRowElement(e.component.getRowIndexByKey(e.key)).addClass(\"dx-row-removed\"); e.data.StateChange = " + (int)StateChange.Deleted + "; e.cancel = true; e.component.refresh(); }");
            script.Append(jsBlock);
            script.Append("}");

            dataGridBuilder.OnRowRemoving(script.ToString());

            return dataGridBuilder;
        }
    }
}
